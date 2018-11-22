import * as React from 'react'

import "./CustomTesti.less?raw"

type TestimonialElement = {
  Message: () => JSX.Element;
  Name: () => JSX.Element;
  stars: number;
}

interface IProps {
  testimonials?: TestimonialElement[],
  className?: string
}

const defaultTestimonials = [
  {
    Message: () => <span className="message">I'm so lucky to have grabbed <br></br> this deal while it lasted!</span>,
    Name: () => <span> -Chege</span>,
    stars: 5
  },
  {
    Message: () => <span className="message">Wow! I couldn't believe my eyes when I received my iPhone X!</span>,
    Name: () => <span> -Felistas</span>,
    stars: 4
  },
  {
    Message: () => <span className="message">I bid, confirmed and won! So happy! Thank you!</span>,
    Name: () => <span> -Mandere</span>,
    stars: 5
  }
]

export default class extends React.PureComponent<IProps> {
  constructor(props) {
    super(props);
  }

  render() {

    const testimonials = this.props.testimonials  || defaultTestimonials

    return <div className={`customTesti ${this.props.className}`}>

      <ul className="customTestiSlider slide">
        {
          testimonials.map(({Message, Name, stars}, index) => 
            <li key={index.toString()}>
              <div className={`avatar person${index + 1}`}></div>
              <div className="details">
                <Message />
                <span className="rating">
                  {
                    [...Array(stars).keys()].map((i) =>
                      <i key={i.toString()} className="icon-star"></i>
                    )
                  }
                  <Name />
                </span>
              </div>
            </li>  
          )
        }
      </ul>

    </div>
  }

}