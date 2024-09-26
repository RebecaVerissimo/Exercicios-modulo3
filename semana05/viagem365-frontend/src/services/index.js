/**
 * 
 * @param {String} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */
export function api(endpoint, init) {
    const url = `http://localhost:3333${endpoint}`
    return fetch(url, init)
}

export async function getCepCoordinates(cep) {
    try {
        // Consulta o CEP na API Nominatim para obter as coordenadas
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`)
        if (!response.ok)
            throw new Error('CEP não encontrado');
        const data = await response.json()
        if (data && data.length > 0) {
            const { lat, lon, display_name } = data[0];
            return { lat, lon, display_name } ;
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
        throw new Error('CEP não encontrado');
    }
}


export async function getAddress(lat, lon) {
    try {
        // Consulta o CEP na API Nominatim para obter as coordenadas
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&format=json`)
        if (!response.ok)
            throw new Error('Endereco não encontrado');
        const data = await response.json()
        if (data) {
            return data.display_name;
        } else {
            throw new Error('Endereco não encontrado');
        }
    } catch (error) {
        console.error('Erro ao consultar o Endereco:', error);
        throw new Error('Endereco não encontrado');
    }
}
