
export default function GroupImageBox({ image }) {

    return <div className="image-manage-div">
        <img className="img-manage" src={image.url}></img>
        <p>{image.preview ? 'yes' : 'no'}</p>
        <i className="fa-solid fa-trash-can"></i>
    </div>
}
