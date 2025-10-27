export const fetchTrackingNumbersFromApi = async (trackingNumber: string) => {
        const url = `https://trackingpackage.p.rapidapi.com/TrackingPackage?trackingNumber=${trackingNumber}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key':
                    '46e4600040msh2fc1496a0ac3011p147823jsn2ca935ec8b45',
                'x-rapidapi-host': 'trackingpackage.p.rapidapi.com',
                Authorization: 'Basic Ym9sZGNoYXQ6TGZYfm0zY2d1QzkuKz9SLw==',
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };