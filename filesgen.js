var path = require('path')
var fs = require('fs')

var allPublicImages = []
var allPublicSounds = []

function recFindByExt(base,ext,files,result) 
{
    files = files || fs.readdirSync(base) 
    result = result || [] 

    files.forEach( 
        function (file) {
            var newbase = path.join(base,file)
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase)
                    if (ext === 'png' || ext === 'PNG' || ext === 'jpg' || ext === 'gif') allPublicImages.push(newbase)
                    else allPublicSounds.push(newbase);
                } 
            }
        }
    )
    return result
}

recFindByExt('./public/img/','png')
recFindByExt('./public/img/','PNG')
recFindByExt('./public/img/','jpg')
recFindByExt('./public/img/','gif')


allPublicImages = JSON.stringify(allPublicImages);
fs.writeFileSync('./src/allPublicImages.json', allPublicImages);


/* NOTE -- THIS IS ONLY FOR PUBLIC, ALL SRC / BACKGROUNDS NEEDS TO BE DONE MANUALLY IN APP.JS */











