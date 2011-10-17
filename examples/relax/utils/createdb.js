var cradle = require("cradle");

cradle.setup({ host: 'localhost',
               port: 5984,
               options: { cache: true, raw: false }});

var connection = new (cradle.Connection)

function create_database(dbname) {
    var db = connection.database(dbname);
    db.exists(function(err, exists) {
        if (!exists) {
            db.create()
        }
    });
    return db;
}

var wdcnzDb = create_database('wdcnz')

function cradle_error(err, res) {
    if (err) { 
    	console.log(err)
    }
}

function update_views(db, docpath, code) {
    function save_doc() {
        db.save(docpath, code, cradle_error);
        return true;
    }
    // compare function definitions in document and in code
    function compare_def(docdef, codedef) {
        var i = 0;
        if (!codedef && !docdef) {
            return false;
        }
        if ((!docdef && codedef) || (!codedef && docdef)) {
            console.log('new definitions - updating "' + docpath +'"')
            return true;
        }        
        for (var u in docdef) {
            i++;
            if (!codedef[u] || docdef[u] != codedef[u].toString()) {
                console.log('definition of "' + u + '" changed - updating "' + docpath +'"')
                return true;
            }
        }
        // check that both doc and code have same number of functions
        for (var u in codedef) {
            i--;
            if (i < 0) {
                console.log('new definitions - updating "' + docpath +'"')
                return true;
            }
        }
        return false;
    }
    
    db.get(docpath, function(err, doc) {
        if (!doc) {
            console.log('no design doc found updating "' + docpath +'"')
            return save_doc();
        }
        if (compare_def(doc.updates, code.updates) || compare_def(doc.views, code.views)) {
            return save_doc();
        }
        console.log('"' + docpath +'" up to date')            
    });
}

var designdoc = {
    language: 'javascript',
    views: {
    	all: {
            map: function (doc) {
            	emit(doc.id, doc);
            }
    	},
        speakers: {
            map: function (doc) {
            	emit(doc.id, doc);
            },
            reduce: function(keys, counts, rereduce) {
                return sum(counts)
            }
        }
    }    
}

update_views(wdcnzDb, '_design/all', designdoc);