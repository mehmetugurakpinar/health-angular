sequenceDiagram
    autonumber

    participant U as User (Tarayıcı/Mobil)
    participant F as Frontend (React/Angular/Vue...)
    participant G as API Gateway/Orchestrator
    participant R as Redis (Cache)
    participant Qs as SearchQueue (MQ)
    participant C as Connector Microservice
    participant A as Harici API (Havayolu/GDS)
    participant Qr as ResultQueue (MQ)

    Note over U: 1) Kullanıcı, arama parametrelerini girer ve "Ara" butonuna basar
    U->>F: (1) Arama isteği (HTTP POST /search)

    Note over F: 2) Frontend isteği Orchestrator'a yönlendirir
    F->>G: (2) "IST-LON, 10-15 Ocak, 1 yolcu..."

    alt Opsiyonel Cache Kontrolü
        Note over G,R: 3) Orchestrator, parametreleri Cache’te arar
        G->>R: (3) Cache Lookup (IST-LON, 10-15 Ocak)
        R-->>G: (4) Cache’de sonuç yok / süresi dolmuş
    end

    Note over G: 5) Mesaj Kuyruğuna gönderim
    G->>Qs: (5) "Yeni Arama: requestId=abcd1234, IST-LON..."

    Note over C: 6) Mikro servisler, SearchQueue'yu dinliyor
    Qs-->>C: (6) Arama mesajını tüket (Connector Microservice)

    Note over C,A: 7) Harici API çağrısı
    C->>A: (7) "IST-LON, tarih: 10-15 Ocak"
    A-->>C: (8) Uçuş/ Fiyat sonuçları

    Note over C: 9) Gelen sonuçları normalize et ve ResultQueue'ya gönder
    C->>Qr: (9) "requestId=abcd1234, THY uçuş listesi..."

    Note over G: 10) Orchestrator/ Gateway, ResultQueue'yu dinliyor
    Qr-->>G: (10) Yeni sonuç mesajı (örn. THY’den ilk veri geldi)

    opt Kısmi Sonuç Gönderimi
        Note over G,F: 11) Kısmi sonuçlar Frontend’e gerçek zamanlı iletilir
        G->>F: (11) WebSocket/SSE/Long Polling ile "İlk sonuçlar..."
        F-->>U: (12) Ekranda ilk uçuş seçenekleri görünür
    end

    Note over C,A: 13) Diğer havayolu/GDS API çağrıları (Paralel devam eder)
    C->>A: (13) "IST-LON, tarih: 10-15 Ocak"
    A-->>C: (14) Ek uçuş/ Fiyat sonuçları

    C->>Qr: (15) Diğer sonuçlar (ör. Pegasus, Lufthansa) ResultQueue'ya
    Qr-->>G: (16) Orchestrator yeni sonuçları alır

    Note over G,F: 17) Biriken sonuçlar Frontend’e kademeli olarak aktarılır
    G->>F: (17) "Yeni sonuçlar: Pegasus, Lufthansa..."

    F-->>U: (18) Liste güncellenir / sıralanır (En ucuzdan pahalıya...)

    alt Opsiyonel Cache Yazma
        Note over G,R: 19) Kısmi/tam sonuçları Cache’e yaz (TTL: 5dk gibi)
        G->>R: (19) "IST-LON sonuçlarını kaydet"
    end

    Note over U: 20) Kullanıcı arama sonuçlarını görüntüler, filtreler, vb.