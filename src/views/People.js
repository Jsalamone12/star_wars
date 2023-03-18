import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const People = (props) => {
    const { phrase } = useParams();

    const [warriors, setWarriors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedWarrior, setSelectedWarrior] = useState({});
    const [error, setError] = useState(false)

    useEffect(() => {
        if (phrase === undefined) {
            return;
        }


        setIsLoading(true);

        axios
            .get(`https://swapi.dev/api/people/${phrase}`)
            .then((res) => {
                console.log(res);

                setWarriors(res.data.results);
                setSelectedWarrior(res.data);
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

    const handleWarriorSelect = (id) => {
        const selected = warriors.filter(warrior => warrior.id === id);
        setSelectedWarrior(selected[0]);
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
            {!isLoading && !warriors && !error && (
                <div>
                </div>
            )}
            {warriors && (
                <ul>
                    {warriors.map((warrior, index) => (
                        <li key={index} onClick={() => handleWarriorSelect(index)}>
                            {warrior.name}
                        </li>
                    ))}
                </ul>
            )}
            {selectedWarrior.name && (
                <div>
                    <h2>{selectedWarrior.name}</h2>
                    <p>Height: {selectedWarrior.height}</p>
                    <p>Mass: {selectedWarrior.mass}</p>
                    <p>Hair Color: {selectedWarrior.hair_color}</p>
                    <p>Skin Color : {selectedWarrior.skin_color}</p>
                </div>
            )}
        </div>
    );
}
export default People;
