const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Swiss Institute Australia - RTO 41517',
        page: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About Us - Swiss Institute Australia',
        page: 'about'
    });
});

app.get('/courses', (req, res) => {
    res.render('courses', { 
        title: 'Our Courses - Swiss Institute Australia',
        page: 'courses'
    });
});

app.get('/courses/:slug', (req, res) => {
    const courseData = getCourseBySlug(req.params.slug);
    if (courseData) {
        res.render('course-detail', { 
            title: `${courseData.code} ${courseData.name} - Swiss Institute Australia`,
            page: 'courses',
            course: courseData
        });
    } else {
        res.status(404).render('404', { title: 'Page Not Found', page: '' });
    }
});

app.get('/policies', (req, res) => {
    res.render('policies', { 
        title: 'Policies & Procedures - Swiss Institute Australia',
        page: 'policies'
    });
});

app.get('/handbooks', (req, res) => {
    res.render('handbooks', { 
        title: 'Student Handbooks - Swiss Institute Australia',
        page: 'handbooks'
    });
});

app.get('/agents', (req, res) => {
    res.render('agents', { 
        title: 'Agent Information - Swiss Institute Australia',
        page: 'agents'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Contact Us - Swiss Institute Australia',
        page: 'contact'
    });
});

// Search functionality
app.get('/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : '';
    
    // Searchable content
    const searchableContent = [
        { title: 'Certificate III in Commercial Cookery', code: 'SIT30821', type: 'Course', category: 'Hospitality', url: '/courses/certificate-iii-commercial-cookery', keywords: 'chef cooking culinary kitchen food' },
        { title: 'Certificate IV in Kitchen Management', code: 'SIT40521', type: 'Course', category: 'Hospitality', url: '/courses/certificate-iv-kitchen-management', keywords: 'chef supervisor kitchen management cooking' },
        { title: 'Diploma of Hospitality Management', code: 'SIT50422', type: 'Course', category: 'Hospitality', url: '/courses/diploma-hospitality-management', keywords: 'hotel restaurant management hospitality' },
        { title: 'Advanced Diploma of Hospitality Management', code: 'SIT60322', type: 'Course', category: 'Hospitality', url: '/courses/advanced-diploma-hospitality-management', keywords: 'senior manager hospitality hotel restaurant' },
        { title: 'Diploma of Business', code: 'BSB50120', type: 'Course', category: 'Business', url: '/courses/diploma-business', keywords: 'business management administration' },
        { title: 'Advanced Diploma of Business', code: 'BSB60120', type: 'Course', category: 'Business', url: '/courses/advanced-diploma-business', keywords: 'senior business management executive' },
        { title: 'Diploma of Leadership and Management', code: 'BSB50420', type: 'Course', category: 'Business', url: '/courses/diploma-leadership-management', keywords: 'leader team manager leadership' },
        { title: 'Student Handbook', type: 'Resource', url: '/handbooks', keywords: 'handbook guide student information rights' },
        { title: 'Policies & Procedures', type: 'Resource', url: '/policies', keywords: 'policy procedure rules refund complaints privacy' },
        { title: 'Agent Information', type: 'Resource', url: '/agents', keywords: 'agent partner recruitment international' },
        { title: 'Contact Us', type: 'Page', url: '/contact', keywords: 'contact email phone address enquiry' },
        { title: 'About Swiss Institute', type: 'Page', url: '/about', keywords: 'about history rto melbourne campus' },
        { title: 'Recognition of Prior Learning (RPL)', type: 'Resource', url: '/policies', keywords: 'rpl credit transfer prior learning experience' },
        { title: 'Fees and Refund Policy', type: 'Policy', url: '/policies', keywords: 'fees payment refund money cost' },
        { title: 'Complaints and Appeals', type: 'Policy', url: '/policies', keywords: 'complaint appeal grievance feedback' },
    ];
    
    let results = [];
    
    if (query) {
        results = searchableContent.filter(item => {
            const searchText = `${item.title} ${item.code || ''} ${item.category || ''} ${item.keywords || ''}`.toLowerCase();
            return searchText.includes(query);
        });
    }
    
    res.render('search', {
        title: query ? `Search results for "${req.query.q}" - Swiss Institute Australia` : 'Search - Swiss Institute Australia',
        page: 'search',
        query: req.query.q || '',
        results: results
    });
});

// Contact form submission
app.post('/contact', (req, res) => {
    // Handle form submission (would connect to email service in production)
    console.log('Contact form submission:', req.body);
    res.render('contact', { 
        title: 'Contact Us - Swiss Institute Australia',
        page: 'contact',
        success: true
    });
});

// Course data helper
function getCourseBySlug(slug) {
    const courses = {
        'certificate-iii-commercial-cookery': {
            code: 'SIT30821',
            name: 'Certificate III in Commercial Cookery',
            category: 'Hospitality',
            duration: '52 weeks',
            delivery: ['Face-to-face', 'Practical training', 'Work placement'],
            description: 'This qualification reflects the role of commercial cooks who use a wide range of well-developed cookery skills and sound knowledge of kitchen operations to prepare food and menu items.',
            units: 25,
            cricos: 'TBC'
        },
        'certificate-iv-kitchen-management': {
            code: 'SIT40521',
            name: 'Certificate IV in Kitchen Management',
            category: 'Hospitality',
            duration: '78 weeks',
            delivery: ['Face-to-face', 'Practical training', 'Work placement'],
            description: 'This qualification reflects the role of commercial cooks who have a supervisory or team leading role in the kitchen. They operate independently or with limited guidance from others.',
            units: 33,
            cricos: 'TBC'
        },
        'diploma-hospitality-management': {
            code: 'SIT50422',
            name: 'Diploma of Hospitality Management',
            category: 'Hospitality',
            duration: '104 weeks',
            delivery: ['Face-to-face', 'Online learning', 'Work placement'],
            description: 'This qualification reflects the role of highly skilled senior operators who use a broad range of hospitality skills combined with managerial skills and sound knowledge of industry.',
            units: 28,
            cricos: 'TBC'
        },
        'advanced-diploma-hospitality-management': {
            code: 'SIT60322',
            name: 'Advanced Diploma of Hospitality Management',
            category: 'Hospitality',
            duration: '104 weeks',
            delivery: ['Face-to-face', 'Online learning', 'Work placement'],
            description: 'This qualification reflects the role of highly skilled senior managers who use a broad range of hospitality skills combined with specialised managerial skills.',
            units: 33,
            cricos: 'TBC'
        },
        'diploma-business': {
            code: 'BSB50120',
            name: 'Diploma of Business',
            category: 'Business',
            duration: '52 weeks',
            delivery: ['Face-to-face', 'Online learning', 'Blended'],
            description: 'This qualification would apply to individuals with various job titles including executive officers, program consultants and program coordinators.',
            units: 12,
            cricos: 'TBC'
        },
        'advanced-diploma-business': {
            code: 'BSB60120',
            name: 'Advanced Diploma of Business',
            category: 'Business',
            duration: '52 weeks',
            delivery: ['Face-to-face', 'Online learning', 'Blended'],
            description: 'This qualification reflects the role of individuals in a variety of Business Services job roles who have significant experience in a senior administrative role.',
            units: 10,
            cricos: 'TBC'
        },
        'diploma-leadership-management': {
            code: 'BSB50420',
            name: 'Diploma of Leadership and Management',
            category: 'Business',
            duration: '52 weeks',
            delivery: ['Face-to-face', 'Online learning', 'Blended'],
            description: 'This qualification reflects the role of individuals who apply knowledge, practical skills and experience in leadership and management across a range of enterprise and industry contexts.',
            units: 12,
            cricos: 'TBC'
        }
    };
    return courses[slug] || null;
}

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found', page: '' });
});

app.listen(PORT, () => {
    console.log(`🚀 Swiss Institute website running at http://localhost:${PORT}`);
});
