const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const passport = require('passport');

// Toplu senkronizasyon uç noktası
router.post('/sync', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { services } = req.body;
    
    if (!services || !Array.isArray(services)) {
        return res.status(400).json({ message: 'Geçersiz veri formatı' });
    }

    try {
        const syncResults = [];

        for (const item of services) {
            // localId ve userId kontrolü ile mükerrer kaydı önle
            let existing = await Service.findOne({ localId: item.id, userId: req.user._id });
            
            if (existing) {
                // Güncelleme gerekirse burada yapılabilir
                syncResults.push({ id: item.id, status: 'updated' });
            } else {
                const newService = new Service({
                    ...item,
                    localId: item.id,
                    userId: req.user._id,
                    id: undefined // MongoDB kendi ID'sini oluşturacak
                });
                await newService.save();
                syncResults.push({ id: item.id, status: 'synced' });
            }
        }

        res.json({ message: 'Senkronizasyon başarılı', results: syncResults });
    } catch (error) {
        console.error('Sync Error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

module.exports = router;
