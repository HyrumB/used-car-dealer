import { Router } from 'express';
import { getVehicleContent } from '../../models/vehicle/index.js';
import { requireAuthTrusted } from '../../utils/auth.js';

const router = Router();

router.get('/:id', async (req, res) => {
    const dbResponse = await getVehicleContent(req.params.id);
    console.log("dbResponse.rows: ");
    console.log(dbResponse);
    res.render('vehicle/index', { title: `${dbResponse.vehicle_name}`, vehicle: dbResponse });
});

router.get('/edit', requireAuthTrusted, async (req, res) => {
    res.render('vehicle/edit', { title: 'edit page' });
});

router.get('/add', requireAuthTrusted, async (req, res) => {
    res.render('vehicle/add', { title: 'add page' });
});

export default router;