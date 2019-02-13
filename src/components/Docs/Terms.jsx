import { withRouter } from 'react-router-dom';
import React from 'react';

const Terms = props => (
  <div className="docs page-root terms" role="region">
    <div className="docs-container" role="document">
      <h2 role="heading">Web Site Terms and Conditions of Use</h2>
      <h3 role="heading">1. Terms</h3>
      <p>
        By accessing this web site, you are agreeing to be bound by these web
        site Terms and Conditions of Use, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing this site. The materials contained in
        this web site are protected by applicable copyright and trade mark law.
      </p>
      <h3 role="heading">2. Use License</h3>
      <ol role="list" type="a">
        <li role="listitem">
          <span>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on News&apos;s web site for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
          </span>
          <ol role="list" type="i">
            <li role="listitem">Modify or copy the materials;</li>
            <li role="listitem">
              Use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial);
            </li>
            <li role="listitem">
              Attempt to decompile or reverse engineer any software contained on
              News&apos;s web site;
            </li>
            <li role="listitem">
              Remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li role="listitem">
              Transfer the materials to another person or &quot;mirror&quot; the
              materials on any other server.
            </li>
          </ol>
        </li>
        <li role="listitem">
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by News at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </li>
      </ol>
      <h3 role="heading">3. Disclaimer</h3>
      <ol role="list" type="a">
        <li role="listitem">
          The materials on News&apos;s web site are provided &quot;as
          is&quot;. News makes no warranties, expressed or implied, and hereby
          disclaims and negates all other warranties, including without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights. Further, News does not
          warrant or make any representations concerning the accuracy,
          likely results, or reliability of the use of the materials on its
          Internet web site or otherwise relating to such materials or on any
          sites linked to this site.
        </li>
      </ol>
      <h3 role="heading">4. Limitations</h3>
      <p>
        In no event shall News or its suppliers be liable for any damages
        (including, without limitation, damages for loss of data or profit, or
        due to business interruption,) arising out of the use or inability to
        use the materials on News&apos;s Internet site, even if News or a
        News authorized representative has been notified orally or in writing
        of the possibility of such damage. Because some jurisdictions do not
        allow limitations on implied warranties, or limitations of liability for
        consequential or incidental damages, these limitations may not apply to
        you.
      </p>
      <h3 role="heading">5. Revisions and Errata</h3>
      <p>
        The materials appearing on News&apos;s web site could include
        technical, typographical, or photographic errors. News does not
        warrant that any of the materials on its web site are accurate,
        complete, or current. News may make changes to the materials contained
        on its web site at any time without notice. News does not, however,
        make any commitment to update the materials.
      </p>
      <h3 role="heading">6. Links</h3>
      <p>
        News has not reviewed all of the sites linked to its Internet web site
        and is not responsible for the contents of any such linked site. The
        inclusion of any link does not imply endorsement by News of the site.
        Use of any such linked web site is at the user&apos;s own risk.
      </p>
      <h3 role="heading">7. Site Terms of Use Modifications</h3>
      <p>
        News may revise these terms of use for its web site at any time
        without notice. By using this web site you are agreeing to be bound by
        the then current version of these Terms and Conditions of Use.
      </p>
      <h3 role="heading">8. Governing Law</h3>
      <p>
        Any claim relating to News&apos;s web site shall be governed by the
        laws of the State of Planet Fhloston without regard to its conflict of
        law provisions.
        <br />
        General Terms and Conditions applicable to Use of a Web Site.
      </p>
    </div>
  </div>
);

export default withRouter(Terms);
