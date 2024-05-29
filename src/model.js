const mongoose = require('./mongoose').mongoose;
/*
main().catch(err => console.log(err));
exports.main = async () => {
    await mongoose.connect('mongodb+srv://links:huu5kkuCfpxQ8qSu@cluster19070.wvq4dny.mongodb.net/links?retryWrites=true&w=majority&appName=Cluster19070');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
*/
const userSchema = new mongoose.Schema({
    name: String
});
const User = mongoose.model('User', userSchema);



