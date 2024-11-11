export function divideInGroup(total: number, page: number): number {
    const resultado: number[] = [];
    
    while (total > 0) {
        if (total >= 30) {
            resultado.push(30);
            total -= 30;
        } else {
            resultado.push(total);
            total = 0;
        }
    }
    
    return resultado[page];
}