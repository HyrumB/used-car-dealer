import { Router } from 'express';

// import other routes for simpler server code
import account_routes from './accounts/index.js';
import item_routes from './items/index.js';
import category_routes from './categories/index.js';

const router = Router();

router.use('/accounts', account_routes);
router.use('/items', item_routes);
router.use('/categories', category_routes);

// The home page route
router.get('/', async (req, res) => {
    res.render('index', { title: 'Home Page' });
});

router.get('/contact-us', async (req, res) => {
    res.render('contact-us', { title: 'Contact Us' });
});

export default router;