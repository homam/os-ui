import * as React from "react"
import mkShake from "../lib/Shake"


interface IProps {
  onShakeEvent
}

export default class ShakeScreen extends React.PureComponent<IProps> {

  shake : any
  bindedOnShaked: any

  onShaked() {
    this.props.onShakeEvent();
  }

  componentDidMount(){
    const Shake = mkShake(window)
    const shake = new Shake({
      threshold: 3, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    });
    shake.start();
    this.shake = shake
    this.bindedOnShaked = this.onShaked.bind(this)
    window.addEventListener('shake',this.bindedOnShaked, false);
 
  }
  componentWillUnmount() {
    this.shake.stop();
    window.removeEventListener('shake',this.bindedOnShaked);
  }
  render(){

    return<div>

      <span className="shakePhone wobble"></span>

    </div>

  }

}