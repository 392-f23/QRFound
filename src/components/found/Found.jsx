import { useParams } from 'react-router-dom';

const Found = () => {
    const { id } = useParams();
    return (
        <div>
            <p>Found page of item `${id}`</p>
        </div>
    )
}

export default Found;