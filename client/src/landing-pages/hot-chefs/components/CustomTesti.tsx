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
    Message: () => <span className="message">Ο έρωτας περνά απ' το στομάχι!</span>,
    Name: () => <span className="name">-Alexa</span>,
    stars: 5
  },
  {
    Message: () => <span className="message">Θα γλύφετε τα δάχτυλά σας μετά από αυτά τα βίντεο!</span>,
    Name: () => <span className="name"> -Lolanda</span>,
    stars: 4
  },
  {
    Message: () => <span className="message">Έτσι θα ήταν αν ο Άκης έπαιζε στο Magic Mike</span>,
    Name: () => <span className="name"> -Niki</span>,
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