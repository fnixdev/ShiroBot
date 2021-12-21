const fs = require("fs");

module.exports = async (file) =>{
    fs.unlink("./" + file, function (err) {
        if (err && err.code == 'ENOENT') {
            // file doens't exist
            console.info("File tidak ditemukan, tidak bisa menghapus");
        } else if (err) {
            // other errors, e.g. maybe we don't have enough permission
            console.error("Tidak bisa menghapus file");
        } else {
            console.info(`File terhapus`);
        }
    });
}