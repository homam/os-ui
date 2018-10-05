import * as React from "react";
require("./gr.less?raw");

const service = process.env.service || "default";
const mesa_logo = require('./assets/mesa_logo.png')

export const Disclaimer = ({className}) => (
  <div className={`disclaimer-gr ${className || ''}`}>
    <section className={`gr-legals gr-legals-${service}`}>
      <a href="http://www.mesa.com.gr/" target="_blank">
        <img
          className="mesa"
          src={mesa_logo}
          alt="mesa"
        />
      </a>

      <ul>
        <li className="table-head">
          <span className="info">i</span>
          Καρτέλα Συνδρομητικής Υπηρεσίας
        </li>

        <li className="clearfix bottomservicename">
          <label>Όνομα</label>
          <div className="brand-default">Mobiworld</div>
          <div className="brand-frogstar">Frogstar Games</div>
          <div className="brand-funiwin">Funiwin</div>
          <div className="brand-winifun">Winifun</div>
          <div className="brand-winimo">Winimo</div>
          <div className="brand-gamezones">GameZones</div>
        </li>

        <li className="clearfix bottomdescription">
          <label>Περιγραφή</label>
          <div className="brand-default">
            <div>Συνδρομητική υπηρεσία παροχής περιεχομένου</div>
          </div>
          <div className="brand-frogstar">Υπηρεσία Παροχής Περιεχομένου</div>
          <div className="brand-funiwin">
            Συνδρομητικό παιχνίδι διεκδίκησης επάθλου
          </div>
          <div className="brand-winifun">
            Διαδραστικό Παιχνίδι Διεκδίκησης Επάθλων. Θα λαμβάνετε 1 sms ανά
            εβδομάδα.&nbsp;
          </div>
          <div className="brand-winimo">
            Συνδρομητικό Παιχνίδι Διεκδίκησης Επάθλου
          </div>
          <div className="brand-gamezones">
            Συνδρομητική Υπηρεσία Παροχής Περιεχομένου
          </div>
        </li>

        <li className="clearfix bottomfee">
          <label>Χρέωση</label>
          <div className="brand-default">
            €6.24/Εβδομάδα, 3SMS, €2.08 έκαστο&nbsp;
            <a href="http://dimoco.eu/dimoco-services-greece/" target="_blank">
              Τελική τιμή με φόρους
            </a>
          </div>
          <div className="brand-frogstar">
            €6.24/Εβδομάδα, 3SMS, €2.08 έκαστο&nbsp;
            <a href="http://dimoco.eu/dimoco-services-greece/" target="_blank">
              Τελική τιμή με φόρους
            </a>
          </div>
          <div className="brand-funiwin">
            €6.24/Εβδομάδα, 3SMS, €2.08 έκαστο&nbsp;
            <a href="http://dimoco.eu/dimoco-services-greece/" target="_blank">
              Τελική τιμή με φόρους
            </a>
          </div>
          <div className="brand-winifun">
            €5.04/Εβδομάδα, 1SMS{" "}
            <a href="http://paychimp.co/pinakas-ypp/" target="_blank">
              Τελική Τιμή με φόρους
            </a>
          </div>
          <div className="brand-winimo">
            €6.24/Εβδομάδα, 3SMS, €2.08 έκαστο&nbsp;
            <a href="http://paychimp.co/pinakas-ypp/" target="_blank">
              Τελική τιμή με φόρους
            </a>
          </div>
          <div className="brand-gamezones">
            €6.24/Εβδομάδα, 3SMS, €2.08 έκαστο&nbsp;
            <a href="http://paychimp.co/pinakas-ypp/" target="_blank">
              Τελική τιμή με φόρους
            </a>
          </div>
        </li>

        <li className="clearfix bottomservice">
          <label>Πάροχος Υπηρεσίας</label>
          <div className="brand-default">Mobimilia BV</div>
          <div className="brand-frogstar">Mobimilia BV</div>
          <div className="brand-funiwin">Mobimilia BV</div>
          <div className="brand-winifun">Mobimilia BV</div>
          <div className="brand-winimo">Pay Chimp Ltd.</div>
          <div className="brand-gamezones">Pay Chimp Ltd.</div>
        </li>

        <li className="clearfix bottomsupport">
          <label>Επικοινωνία</label>
          <div className="brand-default">
            2103009942,&nbsp;
            <a href="mailto:info-gr@mobile-info.cc">info-gr@mobile-info.cc</a>
          </div>
          <div className="brand-frogstar">
            2103009942,&nbsp;
            <a href="mailto:info-gr@mobile-info.cc">info-gr@mobile-info.cc</a>
          </div>
          <div className="brand-funiwin">
            2103009942,&nbsp;
            <a href="mailto:info-gr@mobile-info.cc">info-gr@mobile-info.cc</a>
          </div>
          <div className="brand-winifun">
            2103009942,&nbsp;
            <a href="mailto:info-gr@mobile-info.cc">info-gr@mobile-info.cc</a>
          </div>
          <div className="brand-winimo">
            2111881777,&nbsp;
            <a href="mailto:support@paychimp.co">support@paychimp.co</a>
          </div>
          <div className="brand-gamezones">
            2111881777,&nbsp;
            <a href="mailto:support@paychimp.co">support@paychimp.co</a>
          </div>
        </li>

        <li className="clearfix bottomunsublink">
          <label>Διαγραφή</label>
          <div className="brand-default">
            Στείλε WN STOP&nbsp;στο 54444 (Απλή χρέωση SMS στην αποστολή)
          </div>
          <div className="brand-frogstar">
            Στείλε WN&nbsp;STOP&nbsp;στο 54444 (Απλή χρέωση SMS στην αποστολή)
          </div>
          <div className="brand-funiwin">
            Στείλε WN&nbsp;STOP&nbsp;στο 54444 (Απλή χρέωση SMS στην αποστολή)
          </div>
          <div className="brand-winifun">
            Στείλε WN&nbsp;STOP&nbsp;στο 54444 (Απλή χρέωση SMS στην αποστολή)
          </div>
          <div className="brand-winimo">
            Στείλε&nbsp;STOP&nbsp;WN&nbsp;&nbsp;στο 54444 (Απλή χρέωση SMS στην
            αποστολή)
          </div>
          <div className="brand-gamezones">
            Στείλε STOP WN&nbsp;&nbsp;στο 54444 (Απλή χρέωση SMS στην αποστολή)
          </div>
        </li>

        <li className="clearfix bottomtnc">
          <label>Όροι</label>
          <div className="brand-default">
            <a href="http://webcms.mobiworld.biz/main/tnc/8/GR" target="_blank">
              Όροι &amp; Προϋποθέσεις
            </a>
            &nbsp;/&nbsp;
            <a
              href="http://webcms.mobiworld.biz/main/tnc/12/GR"
              target="_blank"
            >
              Πολιτική Απορρήτου
            </a>
          </div>
          <div className="brand-frogstar">
            <a
              href="http://webcms.frogstargames.com/main/tnc/8/GR"
              target="_blank"
            >
              Όροι &amp; Προϋποθέσεις
            </a>
            &nbsp;/&nbsp;
            <a
              href="http://webcms.frogstargames.com/main/tnc/12/GR"
              target="_blank"
            >
              Πολιτική Απορρήτου
            </a>
          </div>
          <div className="brand-funiwin">
            <a href="https://goo.gl/4X9CKb" target="_blank">
              Όροι &amp; Προϋποθέσεις
            </a>
            &nbsp;/&nbsp;
            <a href="https://goo.gl/tjRc6s" target="_blank">
              Πολιτική Απορρήτου
            </a>
          </div>
          <div className="brand-winifun">
            <a href="https://goo.gl/zaHqih" target="_blank">
              Όροι &amp; Προϋποθέσεις
            </a>
            &nbsp;/&nbsp;
            <a href="https://goo.gl/P1ZSZQ" target="_blank">
              Πολιτική Απορρήτου
            </a>
          </div>
          <div className="brand-winimo">
            <a href="https://bit.ly/2joCIUP" target="_blank">
              Όροι &amp; Προϋποθέσεις
            </a>
            &nbsp;/&nbsp;
            <a href="https://bit.ly/2N5eb8w" target="_blank">
              Πολιτική Απορρήτου
            </a>
          </div>
          <div className="brand-gamezones">
            <a href="http://bit.ly/2rbknyv" target="_blank">
              Όροι &amp; Προϋποθέσεις
            </a>
            &nbsp;/&nbsp;
            <a href="https://bit.ly/2OTLJUo" target="_blank">
              Πολιτική Απορρήτου
            </a>
          </div>
        </li>

        <li className="clearfix bottomnetwork">
          <label>Πάροχος δικτύου</label>
          <div className="brand-default">DIMOCO Greece Moν. ΙΚΕ.</div>
          <div className="brand-frogstar">DIMOCO Greece Moν. ΙΚΕ.</div>
          <div className="brand-funiwin">DIMOCO Greece Moν. ΙΚΕ.</div>
          <div className="brand-winifun">DIMOCO Greece Moν. ΙΚΕ.</div>
          <div className="brand-winimo">NETWORK_PROVIDER_WINIMO</div>
          <div className="brand-gamezones">NETWORK_PROVIDER_GAMEZONES</div>
        </li>

        <li className="clearfix winner">
          <div className="brand-funiwin">
            <a
              href="http://n.funiwin.com/gr/tnc-funiwin?offer=1&amp;_next=winner.html"
              target="_blank"
            >
              <strong>
                <div>Νικητές</div>
              </strong>
            </a>
          </div>

          <div className="brand-winifun">
            <a
              href="http://n.winifun.com/gr/tnc-winifun?offer=1&amp;_next=winner.html"
              target="_blank"
            >
              <strong>
                <div>Νικητές</div>
              </strong>
            </a>
          </div>
          <div className="brand-winimo">
            <a
              href="http://n.winimo.com/gr/tnc-winimo?offer=1&amp;_next=winner.html"
              target="_blank"
            >
              <strong>
                <div>Νικητές</div>
              </strong>
            </a>
          </div>
        </li>
      </ul>
    </section>
  </div>
);
