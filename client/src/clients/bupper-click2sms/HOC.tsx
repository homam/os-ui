import * as React from "react";
import * as RDS from "../../common-types/RemoteDataState";
import { ITracker } from "../../pacman/record";
import load, { IKeywordShortcode, IConfig } from "./main";
import { MOLink } from "../lp-api-mo/HOC";

export type State = RDS.RemoteDataState<string, IKeywordShortcode>

export const initialState : State = RDS.NothingYet() as State
export const mockedSuccessState : State = RDS.Success<string, IKeywordShortcode>({ keyword: 'TEST OK', shortcode: '666' })
export const mockedFailureState : State = RDS.Failure<string, IKeywordShortcode>("Mocked Network Error") as State
export const mockedLoadingState : State = RDS.Loading<string, IKeywordShortcode>()

export { IKeywordShortcode }

export type HOCProps = {
  currentState: State,
  MOLink: ACompType
}

type ACompType = 
    React.ComponentType<{children: React.ReactNode} & React.HTMLAttributes<HTMLAnchorElement> & {keyword?: string, shortcode?: string}>
export default <P extends HOCProps>(tracker: ITracker, Comp: React.ComponentType<P>, maybeConfig?: IConfig) => (
  initialState: State
) =>
  class HOC extends React.PureComponent<P> {
    state = {
      currentState: initialState
    }

    componentDidMount() {
      this.setState({currentState: RDS.Loading() as State})
      load(window, maybeConfig).then(
        x => this.setState({currentState: RDS.Success(x) as State})
      ).catch(
        e => this.setState({currentState: RDS.Failure(e.toString()) as State})
      )
    }

    render() {
      const moLink = RDS.match<string, IKeywordShortcode, ACompType>({
        nothingYet: () => ({children, ...props} ) => <a data-state="nothingYet" onClick={() => console.info("nothingYet")} href="javascript: void(0)" {...props}>{children}</a>,
        loading: () => ({children, ...props}) => <a data-state="loading" onClick={() => console.info("loading")} href="javascript: void(0)" {...props}>{children}</a> ,
        failure: (error) => ({children, ...props}) => <a data-state="failure" onClick={() => console.error(error)} href="javascript: void(0)" {...props}>{children}</a> ,
        success: (keywordAndShortcode) => ({children, keyword, shortcode, ...props}) => {
          const keywordAndShortcode1 = {
              keyword: keyword || keywordAndShortcode.keyword, 
              shortcode: shortcode || keywordAndShortcode.shortcode
            }
          return <MOLink onClick={() => tracker.advancedInFlow("click2sms", "click", keywordAndShortcode1)} 
                  keywordAndShortcode={keywordAndShortcode1} {...props}
            >{children}</MOLink>
        }
      })(this.state.currentState)
      return <Comp 
                {...this.props} 
                currentState={this.state.currentState} 
                MOLink={moLink} 
              />
    }
  }