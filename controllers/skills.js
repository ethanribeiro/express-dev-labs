const Skill = require('../models/skills');

module.exports = {
    index,
    new: newSkill,
    create,
    show,
    edit,
    update,
    delete: deleteSkill,
}

async function index(req, res, next) {
    try {
        const results = await Skill.find({});
        res.render('skills/index', { title: 'Skills', skills: results });
    } catch (err) {
        next(err);
    }
}

function newSkill(req, res) {
    res.render('skills/new', { title: 'New Skill', errorMsg: '' });
}

async function create(req, res) {
    const skillData = { ...req.body };

    try {
        const createdSkill = await Skill.create(skillData);
        res.redirect(`/skills/${createdSkill._id}`);
    } catch (err) {
        console.log(err);
        res.render("skills/new", { errorMsg: err.message });
    }
}

async function show(req, res, next) {
    try {
        const id = req.params.id;
        const skill = await Skill.findById(id);

        res.render("skills/show", {
            title: "Skill Info",
            skill,
        });
    } catch (err) {
        console.log(err);
        next(Error(err));
    }
}

async function edit(req, res, next) {
    try {
        const id = req.params.id;
        const results = await Skill.findById(id);
        res.render('skills/edit', { title: 'Edit Skill', skill: results });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
		const updateSkill = await Skill.findByIdAndUpdate(id, req.body, {new: true});
		res.redirect(`/skills/${updateSkill._id}`);
	} catch(err) {
        next(err);
	}
}

async function deleteSkill(req, res) {
    const id = req.params.id;
    Skill.findById(id).then(function(skill) {
        Skill.deleteOne({ _id: skill._id }).then(function () {
            res.redirect(`/skills`);
        }).catch(function (err) {
            console.log(err);
        })
    }).catch(function (err) {
        console.log(err);
    })
}