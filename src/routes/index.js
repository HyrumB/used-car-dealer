import { Router } from 'express';

// import other routes for simpler server code
import account_routes from './accounts/index.js';
import { addMessage } from '../models/contact-us/index.js';
import vehicle_routes from './vehicle/index.js';
import category_routes from './categories/index.js';

const router = Router();

router.use('/accounts', account_routes);
router.use('/vehicle', vehicle_routes);
router.use('/categories', category_routes);

// The home page route
router.get('/', async (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.get('/contact-us', async (req, res) => {
    res.render('contact-us', { title: 'Contact Us' });
});

router.post('/contact-us', async (req, res) => {
    const { name, email, message } = req.body;
    await addMessage(name, email, message);
    res.redirect('/contact-us');
});

export default router;