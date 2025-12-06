// Utility functions

export function formatDate(date: Date | string | null | undefined): string {
	if (!date) return '-';
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleDateString('th-TH', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
}

export function formatDateTime(date: Date | string | null | undefined): string {
	if (!date) return '-';
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toLocaleString('th-TH', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function calculateAge(birthDate: Date | string | null | undefined, referenceDate?: Date): number {
	if (!birthDate) return 0;
	const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
	const ref = referenceDate || new Date();
	const age = ref.getFullYear() - birth.getFullYear();
	const monthDiff = ref.getMonth() - birth.getMonth();
	if (monthDiff < 0 || (monthDiff === 0 && ref.getDate() < birth.getDate())) {
		return age - 1;
	}
	return age;
}

