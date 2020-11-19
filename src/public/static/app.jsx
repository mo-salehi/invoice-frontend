'use strict';



class DataGraber extends React.Component {
  
}


class LineItem extends React.Component {
  render() {
    return (
      <tr className="item last">
        <td>
          Death Star
        </td>
        <td>
          $Crs 20.000.00.0000
        </td>
      </tr>
    );
  }
}

class Invoice extends React.Component {
  render() {
    const logoStyle = {
      width: '100%',
      maxWidth: '300px',
    };

    return (
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr className="top">
            <td colSpan="2">
              <table>
                <tbody>
                  <tr>
                    <td className="title">
                      <img src="/static/images/collectai_logo_green_bg.jpg"
                          style={logoStyle} />
                    </td>

                    <td>
                      Invoice #: 39291 <br/>
                      Created: 17/07/2019 <br/>
                      Due: 17/08/2019
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan="2">
              <table>
                <tbody>
                  <tr>
                    <td>
                      CollectAI GmbH.<br/>
                      20457 Hamburg<br/>
                      Hamburg, Germany
                    </td>

                    <td>
                      Acme, GmbH.<br/>
                      Bob Hans Jens, The Great <br/>
                      youknowit@star-wars-is-real.pew
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <tr className="heading">
            <td>
              Item
            </td>

            <td>
              Price
            </td>
          </tr>

          <LineItem />

          <tr className="total">
            <td></td>

            <td>
              Total: $385.00
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const domContainer = document.querySelector('#invoice');
ReactDOM.render(<Invoice/>, domContainer);
