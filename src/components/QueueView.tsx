import React from 'react';
import { QueueEntry, QueueStatus } from '../types/zetime';
import { Users, Clock, PhoneCall, Play, UserPlus, ChevronUp, ChevronDown } from 'lucide-react';

interface QueueViewProps {
  queue: QueueEntry[];
  onOpenAddWalkinModal: () => void;
  onUpdateQueueStatus: (queueId: string, status: QueueStatus) => void;
  onShiftPosition: (queueId: string, direction: 'up' | 'down') => void;
}

export const QueueView: React.FC<QueueViewProps> = ({
  queue,
  onOpenAddWalkinModal,
  onUpdateQueueStatus,
  onShiftPosition
}) => {
  const activeQueue = queue.filter((q) => q.status === 'WAITING' || q.status === 'CALLED');

  return (
    <div style={{ padding: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: 'var(--text-gold)' }}>
            Live Walk-In Queue
          </h2>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Live wait time estimates
          </span>
        </div>
        <button onClick={onOpenAddWalkinModal} className="gold-button" style={{ padding: '6px 12px', width: 'auto', fontSize: '11px' }}>
          <UserPlus size={14} /> Add Walk-In
        </button>
      </div>

      {activeQueue.length === 0 && (
        <div className="gold-card" style={{ textAlign: 'center', padding: '30px 14px' }}>
          <Users size={36} color="var(--text-muted)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>No Active Walk-Ins in Queue</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Walk-in customers will appear here with live ETA tracking.
          </div>
        </div>
      )}

      {activeQueue.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeQueue.map((q, idx) => {
            const isCalled = q.status === 'CALLED';
            const isFirst = idx === 0;
            const isLast = idx === activeQueue.length - 1;

            return (
              <div key={q.id} className="gold-card" style={{ padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div className="gold-icon-bg" style={{ width: '32px', height: '32px', borderRadius: '50%', fontSize: '13px' }}>
                      #{idx + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-main)' }}>{q.customerName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {q.serviceName} - {q.professionalName || 'First Available'}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> ~{q.estimatedWaitMinutes} min wait
                    </span>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Joined at {q.joinedAt}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-dark)' }}>
                  <button
                    onClick={() => onUpdateQueueStatus(q.id, 'CALLED')}
                    className={`queue-btn-call ${isCalled ? 'called' : ''}`}
                  >
                    <PhoneCall size={12} />
                    <span>{isCalled ? 'Called Customer' : 'Call Customer'}</span>
                  </button>

                  <button
                    onClick={() => onUpdateQueueStatus(q.id, 'IN_SERVICE')}
                    className="queue-btn-start"
                  >
                    <Play size={12} />
                    <span>Start Service</span>
                  </button>

                  <button
                    onClick={() => onShiftPosition(q.id, 'up')}
                    disabled={isFirst}
                    style={{ background: '#f1f5f9', color: 'var(--text-main)', border: '1px solid var(--border-dark)', padding: '6px 10px', borderRadius: '6px', opacity: isFirst ? 0.3 : 1, cursor: isFirst ? 'not-allowed' : 'pointer' }}
                    title="Move Up"
                  >
                    <ChevronUp size={14} />
                  </button>

                  <button
                    onClick={() => onShiftPosition(q.id, 'down')}
                    disabled={isLast}
                    style={{ background: '#f1f5f9', color: 'var(--text-main)', border: '1px solid var(--border-dark)', padding: '6px 10px', borderRadius: '6px', opacity: isLast ? 0.3 : 1, cursor: isLast ? 'not-allowed' : 'pointer' }}
                    title="Move Down"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
