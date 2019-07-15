# Redux 導入編

## なぜ React Redux を使うのか？

https://react-redux.js.org/introduction/why-use-react-redux

## 対象者

ES2015 の関数が読める
React の基本的なコンポーネントや props や state の知識がある

## 導入方法

### React のインストールと設定

1. create-react-appコマンドをインストールする
注: Node.js (version 4以上)がインストールされている必要があります。

```
npm install -g create-react-app
```

2. create-react-appコマンドでアプリを作成する

任意のディレクトリに移動

cd ...

以下のコマンドを実行すると、新しく redux-recipe ディレクトリが作られ、React.js アプリに必要なファイルがコピーされます。
このときにnpm installが実行され依存パッケージが全てインストールされるため少々時間がかかります。

```
create-react-app redux-recipe
```

3. サーバーを起動する

redux-recipe ディレクトリに行き、

```
yarn start
```

を実行するとサーバーが起動し http://localhost:3000 で自動的にブラウザが立ち上がります。

<hr />

### Redux のインストールと設定

#### 1. redux と react-redux をインストール

```
yarn add react-redux redux
```

#### 2. Redux の設定

1. Redux の provider で App コンポーネントをラップします。
provider に store を指定することで １つの store で管理されたデータを子コンポーネントに配信することができます。

```
import { Provider } from 'react-redux'

<Provider store={store}>
  <App />
</Provider>
```


2. store を作成する

redux の createStore を使って store を作成します。

```
import { createStore } from 'redux'
import rootReducer from './reducers'
const store = createStore(rootReducer)
```

reducers は各 state のリスト用に作った reducer を１つにまとめた関数です。
reducer をまとめることで、actions の action.type がどのコンポーネントからトリガーされても対応した action.type を持っている reducer に state が渡り store を変更できるようになります。

※ action については後述しています。

この例では、`originList` と `recipe` が state の `key` になり、各 container に渡されます。
container では `state.originList` や `state.recipe` で値を取得することができます。

reducers.js (reducers)
combineReducers で 複数の reducer を１つの store にまとめます。

```
import { combineReducers } from 'redux'
import originList from './originList'
import recipe from './recipe'

export default combineReducers({
  originList,
  recipe,
})
```

originList.js (reducer)

```
const originList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ORIGINAL_LIST':
      return action.originList
    default:
      return state
  }
}

export default originList
```

recipe.js (reducer)

```
const recipe = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIST':
    case 'RECIPE_FILTER':
      return action.list
    default:
      return state
  }
}

export default recipe
```


3. action について

Action は javascipt のオブジェクトで type フィールド に Action のタイプを指定します。
type フィールド以外は任意で自由に定義することができます。

```
{
  type: "SET_LIST",
  list: list
}
```

このオブジェクトを返す関数が Action です。
この例では、setList に list という配列を渡して type フィールドとその値のlistを返しています。

```
export const setList = list => {
  return {
    type: "RECIPE_FILTER",
    list: list
  }
}
```

Action を dispatch(action) することで store に値をわたすことができます。
そして Reducer の type フィールドにより指定された値（例では lisit）で store を更新します。

react-redux の connect を使うと Action を コンポーネントの Props として使うことができます。
次の例で connect 関数の使い方を紹介します。


4. 各コンポーネントで store を connect して props として使うには

まず、コンポーネントと Redux をつなげるために、Redux の connect 関数を使います。

connect 関数は Redux の store が更新されたときに値を再読み取りする機能があります。
このconnect 関数は２つの引数として、`mapStateToProps` と `mapDispatchToProps` がありますが両方とも任意で不要な場合はnullでもいいです。

`mapStateToProps` は store の状態が変わるたびに呼び出されます。
store の状態すべてを受けとっているので connect されたコンポーネントが必要とするデータを返します。
下記の例では、state の中から list というデータを取り出して props.list として使えるように指定しています。

```
const mapStateToProps = (state, ownProps) => ({
  // ... stateおよびオプションでownPropから計算されたデータ
  // key名: state.(Reducer の state で指定してる key}
  list: state.list
})
```

reducer が保持している store の値の例

```
store = {
  list: [
     { name: 'カレー粉', amount: 1, unit: '個'},
     { name: 'じゃがいも', amount: 1, unit: '個'}
  ],
  filterList: [..]
}
```

`mapDispatchToProps` はstoreにActionをDispatchするために使います。
dispatchはReduxの機能で store.dispatch にアクションを返すことで store を変更することができます。

今回の例ではmapDispatchToProps を関数にして、オブジェクトのフィールドで関数をpropsとして使えるようにしています。

この例では、setList関数は dispatch の callback 関数としてActionを返すことで store の値を更新しています。

```
const mapDispatchToProps = (dispatch, ownProps) => ({
  setList: list => dispatch(setList(list)),
}
```

Action (list を取得して dispatch でアクションを返す)

```
export const setList = list => ({
  type: 'SET_LIST',
  list,
})
```

5. 最後にコンポーネントに state と dispath を connect して、コンポーネントの props として値や関数を使えるようにします。

```
import { connect } from 'react-redux'

import RecipeList from '../components/RecipeList'

const mapStateToProps = (state, ownProps) => ({
  list: state.list
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setList: list => dispatch(setList(list)),
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

```

これで コンポーネントに親からpropsを渡すことなく、どこの階層からでも store を取得・更新することができます。


このような指定をして子にpropsを伝搬させていましたが、

```
<RecipeList list={list} setList{list => {dispatch(setList(list))}} />
```

Redux を使うとコンポーネントはシンプルになりました。

```
<RecipeList />
```

### ここまでで、一通りReduxが使えるようになりました。

ここからはよりReduxを使いやすくするためのリファクタリングとツールの導入をしていきます。

<hr />

#### actions をまとめる

action は dispatch 関数の戻り値である type キーに使われる文字列ですが、変数化することで文字列の打ち間違い（タイボ）を把握することができます。ちなみに文字列だタイボした場合でもエラーが発生しないので、作動しない原因がタイボか分からないので大規模開発になってくると重要な作業になるので、ここでも導入していきます。

ここでは actionTypes というディレクトリをつくってアクションを管理します。
src/actionTypes/index.js

<hr />

#### redux-thunk を使って非同期なデータをReduxで扱う

Apiからのデータを取得してReactで使う場合非同期処理が必要になります。
非同期処理とは Apiからのレスポンスを待ってからデータを処理したり、コンポーネントに伝えるための処理で、JavaScriptでは非同期処理をしない場合は、Apiからの通信が終わったときには本来予定していた非同期処理後のコードがすでに終了していて、通信完了後なにも実行されないということになるので実装する必要があります。

Reduxで非同期処理を行うには redux-thunk を導入します。
redux-thunkをインストールして非同期通信でデータを取得してReactに反映します。


たとえば setList 関数が非同期で処理される場合としてsetTimeoutを使ってみます。

containers/AppContainer.js

```
const mapDispatchToProps = (dispatch, ownProps) => ({
  setOriginalList: list => dispatch(setOriginalList(list)),
  // setList: list => dispatch(setList(list)),
  setList: list => setList(list, dispatch),
})
```

```
// export const setList = list => ({
//   type: SET_LIST,
//   list,
// })

export const setList = list => {
  setTimeout(() => {
    return {
      type: SET_LIST,
      list,
    }
  }, 1000)
}
```

1秒後にアクションを返すとエラーになります。
Error: Actions must be plain objects. Use custom middleware for async actions.
エラー：アクションは普通のオブジェクトでなければなりません。 非同期アクションにカスタムミドルウェアを使用してください。

ということで、redex-thunk を導入します。
https://redux-docs.netlify.com/recipes/configuring-your-store#extending-redux-functionality

document に書かれている `middleware/logger.js` と `enhancers/monitorReducer.js` を追加します。

applyMiddleware で loggerMiddleware と　thunkMiddleware を store の dispatch 機能に適用する ストアエンハンサー を作成するために使います。

次に、compose で middlewareEnhancer と monitorReducerEnhancer を一つの機能に組み立てます。

エンハンサーは1つしか渡すことができないので、createStore で１つにまとめます。

この例に示すように、複数のエンハンサーを使用するには、まずそれらを1つの大きなエンハンサーに構成する必要があります。

最後に、この新しい composedEnhancers 関数を createStore 3番目の引数に渡します。
注：2番目の引数は無視しますが、ストアに状態を事前ロードします。

そして store 作成のロジックを別ファイル移して新しい関数化することでメンテナンスしやすくするため、configureStore.js に store を移します。
https://redux-docs.netlify.com/recipes/configuring-your-store#the-solution-configurestore


```
yarn add redux-thunk
```

store に thunkMiddleware という middleware を追加します。

src/index.js

```
// import { createStore } from 'redux'
// import rootReducer from './reducers'
// const store = createStore(rootReducer)

import configureStore from './configureStore'
const store = configureStore()

```


Action や Reducer には非同期処理の必要がなく通常の同期処理と同じになります。


<hr />

#### dev-tool をつかってstoreの状態を把握する

開発時のみ必要なので npm install の --save-dev を指定します。

```
npm install --save-dev redux-devtools-extension
```

次に、configureStore.js の composeインポート元の関数を削除し、インポート元reduxの新しいcomposeWithDevTools関数に置き換えredux-devtools-extensionます。
https://redux-docs.netlify.com/recipes/configuring-your-store#integrating-the-devtools-extension

あとは chrome ブラウザのエクステンションで redux devtools をインストールすれば完了です。

<hr />

### おまけ

#### SCSS をつかうには

1. Sassをインストール

```
yarn add -D node-sass 
```

SASSを使うために、以前は他にもインストールして、webpackのconfigの設定をする必要がありましたが、今はnode-sass入れるだけでSASSを使うことができます。

2. 既存のcssファイルをscssにリネーム
./src/App.cssを./src/App.scssにリネームします。

それが終わったら、./src/App.js に import されている css の拡張子も scss に変更します。

これだけでもうsassが反映されます。

-----------------------------
