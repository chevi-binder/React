/**
 *
 * MyTree
 *
 */
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { MyTreeNode, TreeErrorType } from '../Main/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectTreeData } from '../Main/selectors';
import { createSelector } from '@reduxjs/toolkit';
import { actions } from '../Main/slice';
import { useSafeCode } from 'utils/errorHandler';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  hasError: Boolean;
}

const selectTreeNodes = createSelector([selectTreeData], treeData =>
  buildTreeNodes(treeData),
);
const buildTreeNodes = treeData => {
  console.log('buildTreeNodes');
  return treeData.map(n => renderNode(n));
};
const renderNode = node => {
  return (
    <TreeItem key={node.Id} nodeId={node.Id} label={node.Name}>
      {Array.isArray(node.Children)
        ? node.Children.map(childNode => renderNode(childNode))
        : null}
    </TreeItem>
  );

  // const node: MyTreeNode = {
  //   key: orgNode.Id,
  //   label: orgNode.Name,
  //   isEditing: orgNode.isEditing,
  //   children: [],
  // };
  // if (orgNode.Children) {
  //   for (const childNode of orgNode.Children) {
  //     node.children.push(renderNode(childNode));
  //   }
  // }
  // return node;
};
const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});
export const MyTree = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const items = useSelector(selectTreeNodes);
  const loadTreeDataError = useSelector(selectError);
  const classes = useStyles();
  const [firstTime, setFirstTime] = useState(true);
  const [state, runSafeCode] = useSafeCode({});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderTree = (node: MyTreeNode) => {
    return (
      <TreeItem key={node.key} nodeId={node.key.toString()} label={node.label}>
        {Array.isArray(node.children)
          ? node.children.map(childNode => renderTree(childNode))
          : null}
      </TreeItem>
    );
  };

  const onNodeClicked = node => {
    runSafeCode(() => {
      if (firstTime) {
        setFirstTime(false);
        throw new Error('Problem while click on node');
      }
      node.isEditing = true;
      dispatch(actions.nodeIsEditingChanged(true));
    });
  };
  const errorText = (error: TreeErrorType | undefined | null) => {
    if (!error) {
      return null;
    }
    throw new Error('aaa');
    switch (error) {
      case TreeErrorType.EMPTY_DATA:
        return 'No Data 😞';
      case TreeErrorType.NOT_FOUND:
        return 'API Not Found';
      default:
        return 'An error has occurred!';
    }
  };
  return (
    <>
      <Div>
        {loadTreeDataError ? errorText(loadTreeDataError) : null}
        {state.error?.message}
        <TreeView
          onNodeSelect={onNodeClicked}
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {items}
        </TreeView>
      </Div>
    </>
  );
});

const Div = styled.div``;
const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

// constructor(props) {
//   super(props);
//   this.state = {
//       treeData: [
//           {
//               "label": "1 > Documents",
//               "data": { id: 1 },
//               "expandedIcon": "fa-folder-open",
//               "collapsedIcon": "fa-folder",
//               "children": [{
//                   "label": "111 > Work",
//                   "data": { id: 111 },
//                   "expandedIcon": "fa-folder-open",
//                   "collapsedIcon": "fa-folder",
//                   "children": [
//                       { "label": "11 > Expenses.doc", "icon": "fa-file-word-o", "data": { id: 11 } },
//                       { "label": "12 > Resume.doc", "icon": "fa-file-word-o", "data": { id: 12 } }
//                   ]
//               },
//               {
//                   "label": "112 > Home",
//                   "data": { id: 112 },
//                   "expandedIcon": "fa-folder-open",
//                   "collapsedIcon": "fa-folder",
//                   "children": [{ "label": "21> Invoices.txt", "icon": "fa-file-word-o", "data": { id: 21 } }]
//               }]
//           },
//           {
//               "label": "2> Pictures",
//               "data": { id: 2 },
//               "expandedIcon": "fa-folder-open",
//               "collapsedIcon": "fa-folder",
//               "children": [
//                   { "label": "31 >barcelona.jpg", "icon": "fa-file-image-o", "data": { id: 31 } },
//                   { "label": "32 > logo.jpg", "icon": "fa-file-image-o", "data": { id: 32 } },
//                   { "label": "33> primeui.png", "icon": "fa-file-image-o", "data": { id: 33 } }]
//           }

//       ],
//       selectedNode: null
//   }
// }

// modifyNodeLabel = () => {
//   const id = Math.floor(Math.random() * 1000);
//   let newTree = this.state.treeData;
//   newTree[1].label = "2> Pictures changed " + id;
//   this.setState({
//       treeData: newTree,
//       selectedNode: newTree[1]
//   })
// }

// addNewNodeAndSelect = (parentId) => {
//   const id = Math.floor(Math.random() * 100);
//   const newNodeData = {
//       "label": id + "> New Node ",
//       "data": {
//           id,
//           parentId
//       },
//       "expandedIcon": "fa-folder-open",
//       "collapsedIcon": "fa-folder",
//       "children": [],
//       "selected": true,
//       "isSelected": true,
//       "expanded": true
//   }
//   const newTree = this.modifyTree(this.state.treeData, newNodeData);
//   this.setState({
//       treeData: newTree
//   })
// }

// modifyTree = (currentTree, nodeAdd) => {
//   return currentTree.map((node) => {
//       if (node.children) {

//           if (node.data.id === nodeAdd.data.parentId) {
//               node.expanded = true;
//               node.children.push(nodeAdd);
//           } else {
//               node.children = this.modifyTree(node.children, nodeAdd);
//           }
//           return node;
//       } else {
//           if (node.data.id === nodeAdd.data.parentId) {
//               node.expanded = true;
//               node.children = [];
//               node.children.push(nodeAdd);
//           }
//           return node;
//       }
//   });
// }

// onSelectNode = (selectedEvent) => {
//   this.setState({
//       selectedNode: selectedEvent.selection
//   })
// }

// render() {
//   return (
//       <div className="App">
//           <div>

//           </div>
//           <div>
//               <Button label="Add node to NODE 1" onClick={() => this.addNewNodeAndSelect(1)} />
//               <Button label="Add node to NODE 2" onClick={() => this.addNewNodeAndSelect(2)} />
//               <Button label="Modify NODE 2 label" onClick={() => this.modifyNodeLabel()} />
//               <p>Selected Node: {this.state.selectedNode && this.state.selectedNode.label}</p>
//               <Tree value={this.state.treeData} selectionMode="single" selectionChange={this.onSelectNode} selection={this.state.selectedNode} />
//           </div>
//       </div>
//   );
// }
