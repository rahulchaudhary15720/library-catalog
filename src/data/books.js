// Mock data file containing the library's book catalog and borrowing records
// Array of books with details required for the table and details page
export const books = [
  // First book entry with all required fields
  { id: 101, title: "The Silent Woods", author: "Priya Sharma", genre: "Mystery", available: true, borrowCount: 7, isbn: "978-0-9876543-2-1", publisher: "Crimson Quill" },
  // Second book entry with all required fields
  { id: 102, title: "Echoes of the Past", author: "Vikram Singh", genre: "Historical Fiction", available: false, borrowCount: 12, isbn: "978-1-2345678-9-0", publisher: "Chronicle Books" },
  // Third book entry with all required fields
  { id: 103, title: "Starlight Sonata", author: "Aanya Patel", genre: "Science Fiction", available: true, borrowCount: 5, isbn: "978-3-1415926-5-3", publisher: "Nova Press" },
  // Fourth book entry with all required fields
  { id: 104, title: "The Hidden Garden", author: "Rajesh Verma", genre: "Fantasy", available: true, borrowCount: 9, isbn: "978-7-6543210-9-8", publisher: "Veridian Books" },
  // Fifth book entry with all required fields
  { id: 105, title: "City of Shadows", author: "Meera Gupta", genre: "Thriller", available: false, borrowCount: 15, isbn: "978-2-4681357-9-0", publisher: "Shadow Publishing" },
];

// Array tracking borrowing history for books
export const borrowHistory = [
  // Borrowing record linked to book ID 101
  { bookId: 101, borrower: "Aryan Singh", date: "2025-03-15" },
  { bookId: 101, borrower: "Siya Sharma", date: "2025-03-22" },
  // Borrowing record linked to book ID 102
  { bookId: 102, borrower: "Rohan Patel", date: "2025-03-18" },
  { bookId: 102, borrower: "Priya Verma", date: "2025-03-28" },
  { bookId: 102, borrower: "Aditya Gupta", date: "2025-03-05" },
  // Borrowing record linked to book ID 103
  { bookId: 103, borrower: "Ananya Singh", date: "2025-03-24" },
  // Borrowing record linked to book ID 104
  { bookId: 104, borrower: "Vikram Sharma", date: "2025-03-19" },
  { bookId: 104, borrower: "Ishita Patel", date: "2025-03-26" },
  // Borrowing record linked to book ID 105
  { bookId: 105, borrower: "Arjun Verma", date: "2025-03-10" },
  { bookId: 105, borrower: "Diya Gupta", date: "2025-03-17" },
  { bookId: 105, borrower: "Karan Singh", date: "2025-03-01" },
];