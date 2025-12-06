import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
	const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
	return bcrypt.hash(password, rounds);
}

async function main() {
	console.log('🌱 Seeding database...');

	// Create default superadmin user
	const superadminPassword = await hashPassword('admin123');
	const superadmin = await prisma.user.upsert({
		where: { username: 'superadmin' },
		update: {},
		create: {
			username: 'superadmin',
			passwordHash: superadminPassword,
			fullName: 'Super Administrator',
			role: Role.SUPERADMIN,
			isActive: true
		}
	});

	console.log('✅ Created superadmin user:', superadmin.username);

	// Create sample master data
	const masterData = [
		{ category: 'PREFIX', value: 'นาย' },
		{ category: 'PREFIX', value: 'นาง' },
		{ category: 'PREFIX', value: 'นางสาว' },
		{ category: 'OCCUPATION', value: 'เกษตรกร' },
		{ category: 'OCCUPATION', value: 'พนักงาน' },
		{ category: 'OCCUPATION', value: 'นักเรียน' },
		{ category: 'NATIONALITY', value: 'ไทย' },
		{ category: 'MARITAL_STATUS', value: 'โสด' },
		{ category: 'MARITAL_STATUS', value: 'สมรส' }
	];

	for (const data of masterData) {
		await prisma.masterData.upsert({
			where: {
				category_value: {
					category: data.category,
					value: data.value
				}
			},
			update: {},
			create: data
		});
	}

	console.log('✅ Created master data');

	// Create sample diseases
	const diseases = [
		{
			code: 'A90',
			nameTh: 'ไข้เลือดออก',
			nameEn: 'Dengue fever',
			abbreviation: 'DF'
		},
		{
			code: 'A91',
			nameTh: 'ไข้เลือดออกเดงกีที่มีอาการเลือดออก',
			nameEn: 'Dengue haemorrhagic fever',
			abbreviation: 'DHF'
		}
	];

	for (const disease of diseases) {
		await prisma.disease.upsert({
			where: { code: disease.code },
			update: {},
			create: disease
		});
	}

	console.log('✅ Created sample diseases');

	console.log('🎉 Seeding completed!');
}

main()
	.catch((e) => {
		console.error('❌ Seeding failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

