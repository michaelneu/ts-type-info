var fs = require("fs");
var FileUtils = (function () {
    function FileUtils() {
    }
    FileUtils.getAllFileNamesFromFolder = function (dir) {
        var fileNames = [];
        fs.readdirSync(dir).forEach(function (file) {
            file = dir + "/" + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                fileNames.push.apply(fileNames, FileUtils.getAllFileNamesFromFolder(file));
            }
            else {
                fileNames.push(file);
            }
        });
        return fileNames;
    };
    return FileUtils;
})();
exports.FileUtils = FileUtils;

//# sourceMappingURL=file-utils.js.map