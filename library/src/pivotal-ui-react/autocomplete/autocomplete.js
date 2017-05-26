import {AutocompleteList} from './autocomplete-list';
import {AutocompleteInput} from './autocomplete-input';
import classnames from 'classnames';
import Cursor from 'pui-cursor';
import from from 'from';
import {default as mixin} from 'pui-react-mixins';
import React from 'react';
import scrollIntoView from 'scroll-into-view';
import Scrim from 'pui-react-mixins/mixins/scrim_mixin';
import through from 'through';
import TrieSearch from 'trie-search';
import 'pui-css-autocomplete';
import PropTypes from 'prop-types';

export {AutocompleteList, AutocompleteInput};

const trieFromSearchableItems = (searchableItems, trieOptions) => {
  return new Promise(resolve => {
    let trie;
    from(function (count, callback) {
      if (searchableItems && count >= searchableItems.length) this.emit('end');
      this.emit('data', searchableItems[count]);
      callback();
    }).pipe(through(value => {
      if (typeof value === 'object') {
        if (!trie) trie = new TrieSearch(null, trieOptions);
        trie.addFromObject(value);
        resolve(trie);
        return;
      }
      if (!trie) trie = new TrieSearch('value', trieOptions);
      trie.add({value});
      resolve(trie);
    }));
  });
};

export class Autocomplete extends mixin(React.Component).with(Scrim) {
  constructor(props, context) {
    super(props, context);
    const value = this.props.value || '';
    this.state = {hidden: true, highlightedSuggestion: 0, suggestedValues: [], trie: null, value};
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    input: PropTypes.object,
    maxItems: PropTypes.number,
    onClick: PropTypes.func,
    onFilter: PropTypes.func,
    onFocus: PropTypes.func,
    onInitializeItems: PropTypes.func,
    onPick: PropTypes.func,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    selectedSuggestion: PropTypes.any,
    trieOptions: PropTypes.object,
    value: PropTypes.string,
    showNoSearchResults: PropTypes.bool
  }

  static defaultProps = {
    maxItems: 50,
    onInitializeItems: done => done([]),
    input: <AutocompleteInput/>,
    placeholder: 'Search',
    showNoSearchResults: false
  }

  componentWillReceiveProps({value}) {
    if (value !== this.props.value) {
      this.setState({value});
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.onInitializeItems((searchableItems = []) => {
      trieFromSearchableItems(searchableItems, this.props.trieOptions).then(trie => {
        this.setState({searchableItems, trie});
      });
    });
  }

  onSearch = (value, callback) => {
    if (this.props.onSearch) return this.props.onSearch(value, callback);
    const {maxItems} = this.props;
    const {trie} = this.state;
    if (!trie) return callback([]);
    value = value.trim();
    let result = trie.get(value || '');
    if (this.props.onFilter) {
      result = this.props.onFilter(result);
    }
    callback(result.slice(0, maxItems));
  }

  showList = (defaultValue = null) => {
    const value = defaultValue === null ? this.state.value : defaultValue;
    this.onSearch(value, (suggestedValues) => {
      this.setState({hidden: false, suggestedValues: suggestedValues});
    });
  }

  onPick = value => {
    this.props.onPick && this.props.onPick(value);
    this.hideList();
  }

  scrollIntoViewFn = () => {
    if (!this.autocomplete) return;
    Array.from(this.autocomplete.querySelectorAll('.highlighted'))
      .map(el => scrollIntoView(el, {validTarget: target => target !== window}));
  }

  hideList = () => {
    this.setState({hidden: true});
  };

  scrimClick = () => {
    this.hideList();
  };

  render() {
    const $autocomplete = new Cursor(this.state, state => this.setState(state));
    const {
      className, maxItems, onFocus, onClick, disabled, selectedSuggestion, placeholder, input, children,
      onInitializeItems: __IGNORE1, onFilter: __IGNORE2, onPick: __IGNORE3, onSearch: __IGNORE4,
      trieOptions: __IGNORE5, showNoSearchResults, ...props
    } = this.props;
    const {scrollIntoViewFn, onPick, onSearch} = this;
    const clonedInput = React.cloneElement(
      input,
      {$autocomplete, onPick, scrollIntoView: scrollIntoViewFn, onSearch, disabled, onFocus, onClick, placeholder}
    );

    return (<div className={classnames('autocomplete', className)} ref={ref => this.autocomplete = ref} {...props}>
      {clonedInput}
      <AutocompleteList {...{$autocomplete, onPick, maxItems, selectedSuggestion, showNoSearchResults}}>{children}</AutocompleteList>
    </div>);
  }
}
