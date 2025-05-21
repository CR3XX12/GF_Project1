const handleContactForm = (req, res) => {
    const {name, email, message } = req.body;
    console.log ('Form submitted:', { name, email, message});

    // TODO: save to database, file, email service, etc.

    res.json({ message: 'Thank you for contacting us!'});
    
};

module.exports = { handleContactForm };