import { Router } from 'express';

import dbClient from '../../models/index.js';
import { requireAuth } from '../../utils/auth.js';

const router = Router();

router.get('/', async (req, res) => {
    res.render('items/index', { title: 'catalogue' });
});

router.get('/edit', requireAuth, async (req, res) => {
    res.render('items/edit', { title: 'edit page' });
});

router.get('/add', requireAuth, async (req, res) => {
    res.render('items/add', { title: 'add page' });
});

export default router;