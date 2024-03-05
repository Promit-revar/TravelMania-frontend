import './Image.css'
const Image = (props) => {
 return(
    <img src={props.src} height={props?.height} width={props?.width} className="image"/>
 )
}
export default Image;