import React from 'react';
import { Task } from '../Task';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../../lib/store';

export default function TaskList() {
  const dispatch = useDispatch();

  // We're retrieving our state from the store
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED')
    ];

    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  const { status } = useSelector((state) => state.taskbox);

  const pinTask = (id) => {
    // Dispatch the Pinned event to hte store
    dispatch(updateTaskState({ id, newTaskState: 'TASK_PINNED' }));
  };

  const archiveTask = (id) => {
    // Dispatch the Archive event to hte store
    dispatch(updateTaskState({ id, newTaskState: 'TASK_ARCHIVED' }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={'loading'}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={'empty'} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED')
  ];

  return (
    <div className="list-items" data-testid="success" key={'success'}>
      {tasksInOrder.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(taskId) => pinTask(taskId)}
          onArchiveTask={(taskId) => archiveTask(taskId)}
        />
      ))}
    </div>
  );
}

TaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func
};

TaskList.defaultProps = {
  loading: false,
  tasks: []
};
