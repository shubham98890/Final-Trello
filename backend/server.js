import app from './app.js';
import { seedDatabase } from './utils/seedData.js';

const PORT = process.env.PORT || 5000;

// Initialize server
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // Wait a moment for tables to be created, then seed
  setTimeout(async () => {
    try {
      await seedDatabase();
      console.log('✅ Database seeded with sample data!');
    } catch (error) {
      console.log('Database already seeded or seed skipped');
    }
  }, 1000);
});
