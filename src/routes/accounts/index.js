import { Router } from 'express';

import dbClient from '../../models/index.js';
import { requireAuth } from '../../utils/auth.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
    res.render('accounts/index', { title: 'account page' });
});

router.get('/register', async (req, res) => {
    res.render('accounts/register', { title: 'registration page' });
});

router.get('/login', async (req, res) => {
    res.render('accounts/login', { title: 'login page' });
});

export default router;