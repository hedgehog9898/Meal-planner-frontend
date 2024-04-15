export function formatDate (date: Date): string {
	const parsedDate = new Date(date);
	return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(parsedDate);
}

export function formatDateForBe (date: Date): string {
	return date.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
}