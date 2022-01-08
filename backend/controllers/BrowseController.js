var UserPage = require('../models/userPages');

exports.browseAllGet = function(req, res) {
    UserPage.find()
    .exec(function(err, list_pages) {
        if(err) {return next(err);}
        res.send(list_pages);
    })
}

exports.browseRemove = async (req, res) => {
    const id = req.params.id;
    await UserPage.findByIdAndRemove(id).exec();
    res.send('Deleted');
};
