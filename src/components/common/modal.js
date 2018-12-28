import React from 'react';

export default class Modal extends React.Component {
    render() {
        let message = this.props.message;
        let callBack = this.props.onSubmit;
        return (
            <div className="modal is-error" id="modal" tabIndex="-1" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <div className="modal-body">
                  <svg className="modal-icon"><use xlinkHref="assets/svg/icons.svg#icon-alert" /></svg>
                    <p>{message}</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={callBack}>Yes</button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
