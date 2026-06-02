import pg from 'pg';

const { Client } = pg;

async function setupDatabase() {
  const adminUrl = 'postgresql://postgres:6969%40Rajeev@localhost:5432/postgres';
  const adminClient = new Client({ connectionString: adminUrl });

  try {
    console.log('🔗 Connecting to PostgreSQL admin database...');
    await adminClient.connect();

    // Check if database exists
    const result = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = 'portfolio_cms'`
    );

    if (result.rows.length === 0) {
      console.log('📦 Creating portfolio_cms database...');
      await adminClient.query('CREATE DATABASE portfolio_cms');
      console.log('✅ Database created successfully');
    } else {
      console.log('✅ Database already exists');
    }

    await adminClient.end();

    // Now push the schema
    console.log('\n🔄 Pushing database schema...');
    const { execSync } = await import('child_process');
    process.env.DATABASE_URL = 'postgresql://postgres:6969%40Rajeev@localhost:5432/portfolio_cms';
    
    try {
      execSync('pnpm run push', { stdio: 'inherit' });
      console.log('\n✅ Database setup complete!');
    } catch (error) {
      console.error('❌ Error pushing schema:', error.message);
    }
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
