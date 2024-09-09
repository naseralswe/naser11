const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('password');
const archiveScreen = document.querySelector('.archive-screen');
const passwordScreen = document.querySelector('.password-screen');

// التحقق من كلمة المرور لدخول الأرشيف
passwordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (passwordInput.value === '199700') {
        passwordScreen.classList.remove('active');
        archiveScreen.classList.add('active');
    } else {
        alert('كلمة المرور غير صحيحة');
    }
});

const addFileForm = document.getElementById('addFileForm');
const fileTable = document.getElementById('fileTable').getElementsByTagName('tbody')[0];
let files = [];

// إضافة ملف جديد
addFileForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fileName = document.getElementById('fileName').value;
    const fileNumber = document.getElementById('fileNumber').value;
    const file = document.getElementById('fileUpload').files[0];
    const addPassword = document.getElementById('addPassword').value;

    if (addPassword !== '0') {
        alert('كلمة المرور لإضافة الملف غير صحيحة');
        return;
    }

    if (file) {
        const fileUrl = URL.createObjectURL(file);

        // إضافة الملف إلى القائمة
        files.push({
            fileName,
            fileNumber,
            fileUrl
        });

        // تحديث الجدول
        updateFileTable();

        // إعادة تعيين النموذج
        addFileForm.reset();
    }
});

// تحديث جدول الملفات
function updateFileTable() {
    fileTable.innerHTML = '';
    files.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${file.fileName}</td>
            <td>${file.fileNumber}</td>
            <td><a href="${file.fileUrl}" target="_blank">عرض الملف</a></td>
        `;
        fileTable.appendChild(row);
    });
}

// البحث عن ملفات
function searchFile() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredFiles = files.filter(file => {
        return file.fileName.toLowerCase().includes(searchQuery) || file.fileNumber.includes(searchQuery);
    });

    // تحديث الجدول مع النتائج
    fileTable.innerHTML = '';
    filteredFiles.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${file.fileName}</td>
            <td>${file.fileNumber}</td>
            <td><a href="${file.fileUrl}" target="_blank">عرض الملف</a></td>
        `;
        fileTable.appendChild(row);
    });
}