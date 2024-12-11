import React from 'react';
import { TableRow,TableCell, IconButton, Collapse, Box, Table, TableHead, TableBody, Typography, LinearProgress } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';


// interface CollapsibleRowProps {
//   row: any;
//   projects: any;
//   hours: any;
// }

export const CollapsibleRow = ({ row, projects, hours }) => {
  const [open, setOpen] = React.useState(false);
  const assignedProjects = row.projects.split(',');

  return (
    <>
    <TableRow sx={{ textAlign: 'center', backgroundColor: 'white' }}>
      <TableCell >
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
      <TableCell sx={{ padding: 0, height: 10, textAlign: 'center' }}>{row.name}</TableCell>
      <TableCell sx={{ padding: 0, height: 10, textAlign: 'center' }}>{row.update}</TableCell>
      <TableCell sx={{ padding: 0, height: 10, textAlign: 'center' }}>{row.role}</TableCell>
      <TableCell sx={{ padding: 0, height: 10, textAlign: 'center' }}>{row.projects}</TableCell>
      <TableCell sx={{ padding: 0, height: 10, textAlign: 'center' }}>{row.team}</TableCell>
    </TableRow>
    <TableRow>

      <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#93C5FD' }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 2, width: '100%' }}>
            <Table size="small" sx={{ width: '100%' }}>
              <TableHead>
                <TableRow sx={{ borderBottom: '3px solid white' }}>
                  <TableCell sx={{ borderRight: '3px solid white' }}>Project Name</TableCell>
                  <TableCell sx={{ borderRight: '3px solid white' }} >Progress / Project</TableCell>
                  <TableCell sx={{ borderRight: '3px solid white' }} >Tasks Committed</TableCell>
                  <TableCell sx={{ borderRight: '3px solid white' }} >Tasks Ongoing</TableCell>
                  <TableCell sx={{ borderRight: '3px solid white' }} >Progress / Day</TableCell>
                  <TableCell >Progress (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {assignedProjects.map((projectName, index) => {
                  return (
                    <TableRow key={`${row.userId}-${projectName}`}>
                      <TableCell sx={{ borderRight: '3px solid white' }} >
                        <Typography sx={{ fontSize: 16, color: 'black' }}>
                          {projectName}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderRight: '3px solid white' }}>
                        <Box display="flex" alignItems="center" justifyContent='center' gap={1}>
                          <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                            {projects.progress}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={projects.progress}
                            sx={{
                              width: '100%', height: 8, borderRadius: 1, marginTop: 1, backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'blue',
                              },
                            }}
                          />
                        </Box>
                        <Typography sx={{ fontSize: 16 }}>
                          Committed Hours: {hours.committedHours}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ borderRight: '3px solid white', textAlign: 'center' }}>
                        {projects.tasksCommitted.map((task, index) => (
                          <Typography key={index}>
                            {task}<Box
                              sx={{
                                marginLeft: 1,
                                marginBottom: 1,
                                display: 'inline-block',
                                padding: '3px 6px',
                                backgroundColor: 'black',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 12,
                                textAlign: 'center',
                              }}
                            >
                              (1 Hr)
                            </Box>

                          </Typography>

                        ))}
                      </TableCell>
                      <TableCell sx={{ borderRight: '3px solid white', textAlign: 'center' }}>
                        {projects.tasksOngoing.map((task, index) => (
                          <Typography key={index}>{task} <Box
                            sx={{
                              marginBottom: 1,
                              display: 'inline-block',
                              padding: '3px 6px',
                              backgroundColor: 'black',
                              borderRadius: '12px',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 12,
                              textAlign: 'center', 
                            }}
                          >
                            (1 Hr)
                          </Box>  </Typography>
                        ))}
                      </TableCell>
                      <TableCell sx={{ borderRight: '3px solid white', textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                          {hours.progress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                            {hours.totalProgressPercentage}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"

                            value={hours.totalProgressPercentage}
                            sx={{
                              flex: 1, height: 8, borderRadius: 1, backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: 'blue',
                              },
                            }}

                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
  );
};
// export default CollapsibleRow;