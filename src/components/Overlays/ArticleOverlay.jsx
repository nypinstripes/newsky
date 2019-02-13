import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { setCurrentArticle } from '../../actions/actionCreators';
import { Link, withRouter } from 'react-router-dom';
import hdate from 'human-date';
import React, { Component } from 'react';
import sources from '../../../shared/data/sources.json';
import SvgSymbol from '../Tools/SvgSymbol';

class ArticleOverlay extends Component {
  static propTypes = {
    currentArticle: object,
    setCurrentArticle: func
  }

  componentWillUnmount() {
    this.props.setCurrentArticle({});
  }

  getItemAttributions = () => {
    const {
      currentArticle: {
        item: {
          author,
          content,
          publishedAt: posted
        }
      }
    } = this.props;

    let dateOptions = { showTime: true };

    return (
      <div className="overlay-info-attribution">
        <span>
          <span>by </span>
          <h4 rel="noopener noreferrer" role="heading">{author}</h4>
        </span>
        <span><span>on</span> {hdate.prettyPrint(posted, dateOptions)}</span>
      </div>
    );
  }

  getItemMedia = () => {
    const { currentArticle: { item: { urlToImage: image }, url }} = this.props;

    return (
      <div className="overlay-content-body">
        <div className="overlay-content-body-content">
          <div className="overlay-content-body-container"
            onClick={e => e.stopPropagation()}
          >
            <a className="article-overlay-img"
              href={url}
              rel="noopener noreferrer"
              role="img link"
              style={{ backgroundImage: `url(${image})`}}
              tabIndex="0"
              target="_blank"
            />
          </div>
        </div>
      </div>
    );
  }

  getSourceIcon = () => {
    const {
      currentArticle: {
        item: {
          source: { icon, name },
          url
        }
      }
    } = this.props;

    if (icon === '') {
      return <div className="overlay-icon not-available"
        role="presentation"
        title="Icon Not Avaialable"
      />;
    }

    return (
      <a className="overlay-icon"
        href={url}
        rel="noopener noreferrer"
        role="Link"
        style={{ backgroundImage: `url(${icon})` }}
        tabIndex="0"
        target="_blank"
        title={name}
      />
    );
  }

  render() {
    const { currentArticle: { item: { description, title, url }}} = this.props;

    return (
      <div aria-live="polite" className="overlay-content">
        { this.getItemMedia() }
        <div aria-details
          className="overlay-details"
          onClick={e => e.stopPropagation()}
        >
          <div className="overlay-details-container">
            { this.getSourceIcon() }
            <div className="overlay-info">
              <a className="overlay-title"
                ref={ref => this.itemTitleEl = ref}
                rel="noopener noreferrer"
                role="heading link"
                tabIndex="0"
                target="_blank"
              >
                {title}
              </a>
              { this.getItemAttributions() }
            </div>
          </div>
          <p className="overlay-decription">{description}</p>
          <div className="button-row">
            <a className="button"
              href={url}
              onMouseUp={e => e.stopPropagation(e)}
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
              target="_blank"
            >
              <span className="button-text">Read More</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentArticle: state.currentArticle ? state.currentArticle : {}
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentArticle(params) { dispatch(setCurrentArticle(params)); }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleOverlay)
);
