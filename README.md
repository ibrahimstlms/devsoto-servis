# Auto Service Management System (Oto Servis Takip Sistemi)

Bu proje, araç servis işlemlerini takip etmek için geliştirilmiş, çevrimdışı öncelikli (offline-first) bir mobil uygulama ve merkezi bir yönetim backend'inden oluşmaktadır.

## 🚀 Proje Genel Bakışı

Sistem, internet bağlantısı olmasa dahi teknisyenlerin araç kayıtlarını ve kullanılan parçaları kaydedebilmesine olanak tanır. İnternet erişimi sağlandığında, yerel veriler otomatik olarak merkezi MongoDB veritabanına senkronize edilir.

---

## 🛠 Teknoloji Yığını

### Backend (Sunucu)
- **Node.js & Express:** Uygulama iskeleti ve API yönetimi.
- **MongoDB & Mongoose:** Esnek ve ölçeklenebilir veri depolama.
- **Passport.js (Local & JWT):** Güvenli kimlik doğrulama ve yetkilendirme.
- **Bcrypt:** Şifre güvenliği ve hashleme.

### Mobile (Mobil Uygulama)
- **React Native (Expo):** Çapraz platform mobil geliştirme.
- **SQLite (Expo SQLite):** Cihaz üzerinde yerel veri depolama.
- **NativeWind (TailwindCSS):** Hızlı ve modern UI tasarımı.
- **React Navigation:** Uygulama içi akıcı geçişler.
- **Axios:** API iletişimi.
- **NetInfo:** İnternet bağlantı durumu izleme.

---

## 📂 Proje Yapısı

```text
servis/
├── backend/                # Node.js API Sunucusu
│   ├── config/             # DB ve Passport konfigürasyonları
│   ├── models/             # Mongoose (MongoDB) Şemaları
│   ├── routes/             # API Uç Noktaları (Auth, Sync)
│   └── server.js           # Uygulama Giriş Noktası
├── mobile/                 # React Native (Expo) Uygulaması
│   ├── src/
│   │   ├── screens/        # UI Ekranları (Home, Parts, Detail vb.)
│   │   └── services/       # SQLite (db.js) ve Senkronizasyon (sync.js)
│   ├── App.js              # Navigasyon ve Uygulama Kökü
│   └── tailwind.config.js  # Stil Konfigürasyonu
└── README.md               # Proje Dokümantasyonu
```

---

## ✨ Temel Özellikler

1.  **Çevrimdışı Çalışma Modu:** İnternet olmasa da araç kaydı açılabilir ve parça eklenebilir.
2.  **Otomatik Senkronizasyon:** Bağlantı geldiğinde `is_synced` bayrağı üzerinden veriler MongoDB'ye aktarılır.
3.  **Araç Takibi:** Plaka, marka/model, KM, müşteri bilgileri ve fotoğraf desteği.
4.  **Parça Yönetimi:** Araçlara bağlı yedek parça ve işçilik kalemlerinin batch (grup) bazlı takibi.
5.  **Güvenlik:** Kullanıcı bazlı veri izolasyonu ve JWT tabanlı oturum yönetimi.

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Backend Kurulumu
```bash
cd backend
npm install
# .env dosyası oluşturun (PORT, MONGO_URI, JWT_SECRET)
node server.js
```

### 2. Mobil Uygulama Kurulumu
```bash
cd mobile
npm install
# mobile/src/services/sync.js içindeki API_URL'i kendi yerel IP'nizle güncelleyin.
npx expo start
```

---

## 📝 Veri Modeli Notları
- **Local DB (SQLite):** `services` ve `parts` tabloları arasında Foreign Key ilişkisi kurulmuştur.
- **Sync Logic:** Senkronize edilen veriler yerel veritabanında `is_synced = 1` olarak işaretlenir, böylece tekrar gönderilmeleri önlenir.

---
*Bu dokümantasyon Gemini CLI tarafından oluşturulmuştur.*
