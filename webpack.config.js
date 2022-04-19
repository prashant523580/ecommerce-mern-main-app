const path = require("path");

module.exports ={
    entry : "./src/App.js",
    output:{
        filename: "bundle.js",
        path: path.join(__dirname,"public")
    },
    module:{
        rules:[
            {
                loader: "babel-loader",
                test: /\.js$/,
                exclude :/node_module/
            },
            {

                test: /\.(jpg|jpeg|png|webp)$/,
                use:{
                    loader : 'url-loader'
                }
                
            }
        ]
    },
    mode :"development",
    devServer : {
        contentBase :path.join(__dirname,'public')
    }
}