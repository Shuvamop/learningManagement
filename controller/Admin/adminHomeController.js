const bannerModel = require('../../model/bannerModel')
const featureModel = require('../../model/featureModel')
const aboutModel = require('../../model/aboutModel')
const facilityModel = require('../../model/facilityModel')
const teacherModel = require('../../model/teacherModel')
const path =require('path')


const adminhome_banner = async (req, res) => {
    try {
        const data = await bannerModel.find();
        res.render('Admin/adminHome/banner.ejs', {
            title: "homecontent banner page",
            result: data
        });
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error fetching banner data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const bannercreate = async (req, res) => {
    try {
        const image = req.file;
        const varsity = bannerModel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            heading: req.body.heading,
            image: image.path
        });

        const result = await varsity.save();
        console.log(result);
        res.redirect('/admin/banner');
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error creating banner:', error);
        res.status(500).send('Internal Server Error');
    }
};


const adminhome_feature = async (req, res) => {
    try {
        const data = await featureModel.find();
        res.render('Admin/adminHome/features.ejs', {
            title: "homecontent feature page",
            result: data
        });
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error fetching feature data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const featurecreate = async (req, res) => {
    try {
        const image = req.file;
        const varsity = featureModel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: image.path
        });

        const result = await varsity.save();
        res.redirect('/admin/feature');
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error creating feature:', error);
        res.status(500).send('Internal Server Error');
    }
};

const adminhome_about = async (req, res) => {
    try {
        const data = await aboutModel.find();
        res.render('Admin/adminHome/about.ejs', {
            title: "homecontent about page",
            result: data
        });
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error fetching about data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const aboutcreate = async (req, res) => {
    try {
        const image = req.file;
        const varsity = aboutModel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: image.path
        });

        const result = await varsity.save();
        res.redirect('/admin/about');
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error creating about:', error);
        res.status(500).send('Internal Server Error');
    }
};

const adminhome_facility = async (req, res) => {
    try {
        const data = await facilityModel.find();
        res.render('Admin/adminHome/facility', {
            title: "homecontent facility page",
            result: data
        });
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error fetching facility data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const facilitycreate = async (req, res) => {
    try {
        const image = req.file;
        const varsity = facilityModel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            image: image.path
        });

        const result = await varsity.save();
        res.redirect('/admin/facility');
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error creating facility:', error);
        res.status(500).send('Internal Server Error');
    }
};

const adminhome_teacher = async (req, res) => {
    try {
        const data = await teacherModel.find();
        res.render('Admin/adminHome/teacher.ejs', {
            title: "homecontent teacher page",
            result: data
        });
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error fetching teacher data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const teachercreate = async (req, res) => {
    try {
        const image = req.file;
        const varsity = teacherModel({
            name: req.body.name,
            position: req.body.position,
            description: req.body.description,
            image: image.path
        });

        const result = await varsity.save();
        res.redirect('/admin/teacher');
    } catch (error) {
        // Handle the error appropriately, e.g., send an error response or log the error
        console.error('Error creating teacher:', error);
        res.status(500).send('Internal Server Error');
    }
};





module.exports={
    adminhome_banner,
    bannercreate,
    adminhome_feature,
    featurecreate,
    adminhome_about,
    aboutcreate,
    adminhome_facility,
    facilitycreate,
    adminhome_teacher,
    teachercreate
    
}