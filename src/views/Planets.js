import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Planets = (props) => {
    const { phrase } = useParams();
    const [planets, setPlanets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState({});
    const [error, setError] = useState(false)

    useEffect(() => {
        if (phrase === undefined) {
            return;
        }
        setIsLoading(true);


        axios
            .get(`https://swapi.dev/api/planets/${phrase}`)
            .then((res) => {
                console.log(res);

                setPlanets(res.data.results);
                setSelectedPlanet(res.data);
                setError(false);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [phrase]);

    const handlePlanetSelect = (id) => {
        const selected = planets.find(planet => planet.id === id);
        setSelectedPlanet(selected);
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && (
                <div>
                    <p>These aren't the droids you're looking for</p>
                    <img src="https://images.unsplash.com/photo-1597642363544-47e721ef972c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2487&q=80" alt="Obi-Wan Kenobi" style={{ width: '250px' }} />
                </div>
            )}

            {planets && (
                <ul>
                    {planets.map((planet, index) => (
                        <li key={index} onClick={() => handlePlanetSelect(index)}>
                            {planet.name}
                        </li>
                    ))}
                </ul>
            )}
            {selectedPlanet.name && (
                <div>
                    <h2>{selectedPlanet.name}</h2>
                    <p>Climate: {selectedPlanet.climate}</p>
                    <p>Terrain: {selectedPlanet.terrain}</p>
                    <p>Water Surface: {selectedPlanet.surface_water}</p>
                    <p>Population: {selectedPlanet.population}</p>
                </div>
            )}
        </div>
    );
}
export default Planets;
