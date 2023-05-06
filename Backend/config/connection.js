





const mongoose = require("mongoose");
 const connection = (username,password) => {
	let url = `mongodb+srv://${username}:${password}@cluster0.thukbqk.mongodb.net/chinamarket?retryWrites=true&w=majority`
	try {
		mongoose.connect(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`Database connection established`);
	} catch (error) {
		console.log(error.message);
	}
};

 module.exports=connection;
