$(document).ready(function() {
    // Başlangıç öğrenci verisi (statik JSON)
    let studentData = [
        { id: 1, name: "Sinem", surname: "Sevimlikurt", grade: "10-A" },
        { id: 2, name: "Ayşe", surname: "Kaya", grade: "11-B" },
        { id: 3, name: "Mehmet", surname: "Demir", grade: "9-C" },
        { id: 4, name: "Zeynep", surname: "Çelik", grade: "12-A" }
    ];

    // Sayfa yüklendiğinde öğrencileri göster
    displayStudents();

    // Yeni öğrenci ekleme formunu işle
    $("#studentForm").on("submit", function(e) {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
        
        // Form değerlerini al
        const name = $("#name").val();
        const surname = $("#surname").val();
        const grade = $("#grade").val();
        
        // Yeni bir ID oluştur (mevcut en büyük ID + 1)
        const newId = studentData.length > 0 ? Math.max(...studentData.map(student => student.id)) + 1 : 1;
        
        // Yeni öğrenci nesnesi oluştur
        const newStudent = {
            id: newId,
            name: name,
            surname: surname,
            grade: grade
        };
        
        // Öğrenciyi diziye ekle
        studentData.push(newStudent);
        
        // Tabloyu güncelle
        displayStudents();
        
        // Formu temizle
        $("#studentForm")[0].reset();
        
        // Kullanıcıya bilgi ver
        alert(`${name} ${surname} başarıyla eklendi!`);
    });

    // Tabloya tıklama olayları ekle (event delegation)
    $("#studentTable").on("click", "tr", function() {
        // Seçili satırı vurgula (diğerlerini temizle)
        $("#studentTable tr").removeClass("selected-row");
        $(this).addClass("selected-row");
    });

    // Öğrenci silme işlemi için event delegation kullan
    $("#studentTable").on("click", ".delete-btn", function(e) {
        e.stopPropagation(); // Tıklama olayının üst öğelere yayılmasını engelle
        
        // Silinecek öğrencinin ID'sini al
        const studentId = $(this).data("id");
        
        // Kullanıcıdan onay al
        if (confirm("Bu öğrenciyi silmek istediğinizden emin misiniz?")) {
            // Öğrenciyi diziden kaldır
            studentData = studentData.filter(student => student.id !== studentId);
            
            // Tabloyu güncelle
            displayStudents();
        }
    });

    // Öğrencileri tabloda gösterme fonksiyonu
    function displayStudents() {
        // Öğrenci listesini temizle
        $("#studentList").empty();
        
        // Her öğrenci için bir satır oluştur
        studentData.forEach(student => {
            const row = $("<tr></tr>");
            
            // Öğrenci bilgilerini hücrelere ekle
            row.append(`<td>${student.id}</td>`);
            row.append(`<td>${student.name}</td>`);
            row.append(`<td>${student.surname}</td>`);
            row.append(`<td>${student.grade}</td>`);
            
            // Silme butonu ekle
            const deleteButton = $(`<button class="delete-btn" data-id="${student.id}">Sil</button>`);
            const actionCell = $("<td></td>").append(deleteButton);
            row.append(actionCell);
            
            // Satırı tabloya ekle
            $("#studentList").append(row);
        });
    }
});
