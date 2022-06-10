import Converter from "./Converter";
import { connect } from "react-redux";
import { getConvertTC } from "../../redux/converterReducer";
import { AppStateType } from "../../redux/store";

const mapStateToProps = (state: AppStateType) => {
    return {
        converter: state.converterPage,
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        getConvert: (base: string , interest: string, value: number) => {
            dispatch(getConvertTC(base, interest, value))
        }
    }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Converter)
